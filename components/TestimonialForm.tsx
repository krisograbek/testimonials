"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle, AlertCircle } from "lucide-react"
import { translations, type Language } from "@/lib/translations"

interface FormData {
  name: string
  finalTestimonial: string
  before: string
  after: string
  style: string
  emotions: string
  whoRecommend: string
  permissions: {
    fullName: boolean
    linkedin: boolean
    photo: boolean
    logo: boolean
    publicUse: boolean
  }
}

interface TestimonialFormProps {
  language: Language
}

export default function TestimonialForm({ language }: TestimonialFormProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  )
  const [showPreview, setShowPreview] = useState(false)

  const t = translations[language]

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      permissions: {
        fullName: false,
        linkedin: false,
        photo: false,
        logo: false,
        publicUse: false,
      },
    },
  })

  const watchedValues = watch()

  const generateDraft = async () => {
    setIsGenerating(true)
    try {
      const prompt = `Write a short, specific testimonial for Kris based on the answers below. The tone should be honest, clear, and conversational. Pick up the responser's language, your draft must use his language. Emphasize transformation, Kris's teaching style, and the results the person achieved. Write short paragraphs and short sentences, use white spaces. Language: ${language.toUpperCase()}

Name: ${watchedValues.name}
Before: ${watchedValues.before}
After: ${watchedValues.after}
Teaching Style: ${watchedValues.style}
Emotions: ${watchedValues.emotions}
Who to recommend: ${watchedValues.whoRecommend}`

      const response = await fetch("/api/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      })

      if (response.ok) {
        const { draft } = await response.json()
        setValue("finalTestimonial", draft)
      }
    } catch (error) {
      console.error("Error generating draft:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const payload = {
        name: data.name,
        language: language.toUpperCase(),
        testimonialDraft: "",
        finalTestimonial: data.finalTestimonial,
        answers: {
          before: data.before,
          after: data.after,
          style: data.style,
          emotions: data.emotions,
          whoRecommend: data.whoRecommend,
        },
        permissions: data.permissions,
      }

      const response = await fetch(
        "https://primary-production-4f54.up.railway.app/webhook/dce89585-155c-47f6-8f18-51b79697d0e1",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      )

      if (response.ok) {
        setSubmitStatus("success")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting testimonial:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasGuidedAnswers =
    watchedValues.before ||
    watchedValues.after ||
    watchedValues.style ||
    watchedValues.emotions ||
    watchedValues.whoRecommend

  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
            <p className="text-gray-600">{t.form.success}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">Kris Ograbek</h1>
          </div>
          <p className="text-lg text-blue-600 font-medium mb-2">AI & Automation Mentorship</p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
          {/* Required Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="destructive">Required</Badge>
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">{t.form.name} *</Label>
                <Input
                  id="name"
                  {...register("name", { required: true })}
                  placeholder={t.form.namePlaceholder}
                  className={errors.name ? "border-red-500" : ""}
                />
              </div>

              <div>
                <Label htmlFor="finalTestimonial">{t.form.finalTestimonial} *</Label>
                <Textarea
                  id="finalTestimonial"
                  {...register("finalTestimonial", { required: true })}
                  placeholder={t.form.finalTestimonialPlaceholder}
                  rows={6}
                  className={errors.finalTestimonial ? "border-red-500" : ""}
                />
                {watchedValues.finalTestimonial && (
                  <div className="mt-2 flex gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
                      {showPreview ? "Edit" : t.form.preview}
                    </Button>
                  </div>
                )}
              </div>

              {/* Preview */}
              {showPreview && watchedValues.finalTestimonial && (
                <Card className="bg-gray-50">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold mb-2">{t.form.preview}</h4>
                    <div className="prose prose-sm max-w-none">
                      <blockquote className="border-l-4 border-blue-600 pl-4 italic">
                        "{watchedValues.finalTestimonial}"
                      </blockquote>
                      <p className="text-right font-medium mt-2">— {watchedValues.name || "Your Name"}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Guided Questions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                {t.form.guidedQuestions}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="before">{t.form.before}</Label>
                <p className="text-sm text-gray-500 mb-2">{t.form.beforeHint}</p>
                <Textarea id="before" {...register("before")} rows={3} />
              </div>

              <div>
                <Label htmlFor="after">{t.form.after}</Label>
                <p className="text-sm text-gray-500 mb-2">{t.form.afterHint}</p>
                <Textarea id="after" {...register("after")} rows={3} />
              </div>

              <div>
                <Label htmlFor="style">{t.form.style}</Label>
                <p className="text-sm text-gray-500 mb-2">{t.form.styleHint}</p>
                <Textarea id="style" {...register("style")} rows={3} />
              </div>

              <div>
                <Label htmlFor="emotions">{t.form.emotions}</Label>
                <p className="text-sm text-gray-500 mb-2">{t.form.emotionsHint}</p>
                <Textarea id="emotions" {...register("emotions")} rows={3} />
              </div>

              <div>
                <Label htmlFor="whoRecommend">{t.form.whoRecommend}</Label>
                <p className="text-sm text-gray-500 mb-2">{t.form.whoRecommendHint}</p>
                <Textarea id="whoRecommend" {...register("whoRecommend")} rows={3} />
              </div>

              {hasGuidedAnswers && watchedValues.name && (
                <Button
                  type="button"
                  onClick={generateDraft}
                  disabled={isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  {isGenerating ? t.form.generating : t.form.generateDraft}
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Usage Permissions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.form.permissions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: "fullName", label: t.form.permissionFullName },
                { key: "linkedin", label: t.form.permissionLinkedin },
                { key: "photo", label: t.form.permissionPhoto },
                { key: "logo", label: t.form.permissionLogo },
                { key: "publicUse", label: t.form.permissionPublic },
              ].map(({ key, label }) => (
                <Controller
                  key={key}
                  name={`permissions.${key}` as const}
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  )}
                />
              ))}

              <p className="text-sm text-gray-500 pt-2">{t.form.permissionsNote}</p>

            </CardContent>
          </Card>

          {/* Submit */}
          <div className="text-center">
            {submitStatus === "error" && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                {t.form.error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || !watchedValues.name || !watchedValues.finalTestimonial}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-lg"
            >
              {isSubmitting ? t.form.submitting : t.form.submit}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
