export const translations = {
  en: {
    title: "Share Your Success Story",
    subtitle:
      "Thanks for helping me grow! Your testimonial helps others trust me. You can write your own or answer a few questions (AI will generate a short draft for you to tweak).",
    form: {
      name: "Your Name",
      namePlaceholder: "Enter your full name",
      finalTestimonial: "Your Testimonial",
      finalTestimonialPlaceholder: "Write your testimonial here or use the AI draft generator below...",
      guidedQuestions: "Optional: Answer these questions for AI draft generation",
      before: "What were you struggling with before our sessions?",
      beforeHint: 'e.g. "I knew AI was powerful but didn\'t know how to apply it in my business", "I kept copying automations without understanding them", "I didn’t know where to start with AI tools like n8n", "I was overwhelmed by technical jargon and AIs complexity"',
      after: "What changed after our sessions? What did you build or finally understand?",
      afterHint: 'e.g. "I started clearly seeing how AI can impact my business", "I finally built my first automation from scratch", "I learned how to turn ideas into working solutions (get specific)"',
      style: "What stood out about Kris's way of teaching or mentoring?",
      styleHint: "Live building while explaining, clear thought process, calm and honest (“I don’t know” moments), helped me think independently instead of following step-by-step tutorials",
      emotions: "How did you feel during and after the sessions?",
      emotionsHint: 'e.g. "I finally felt like I could figure things out on my own", "I finally knew how to build my own solutions, not blindly copying work of others", "I went from overwhelmed to confident"',
      whoRecommend: "Who would you recommend Kris to — and why?",
      whoRecommendHint: "Anyone who wants to truly understand how AI and automations work — especially non-technical founders, freelancers, consultants, leaders, managers, and creators stuck in tutorial hell",
      permissions: "Usage Permissions",
      permissionFullName: "You can use my full name",
      permissionLinkedin: "You can use my LinkedIn profile link",
      permissionPhoto: "You can use my photo",
      permissionLogo: "You can use my company logo",
      permissionPublic: "You can publicly share this testimonial on Kris's website or landing pages",
      generateDraft: "Generate AI Draft",
      generating: "Generating...",
      preview: "Preview",
      submit: "Submit Testimonial",
      submitting: "Submitting...",
      success: "Thank you! Your testimonial has been submitted successfully.",
      error: "Something went wrong. Please try again.",
    },
  },
  pl: {
    title: "Podziel się swoją historią sukcesu",
    subtitle:
      "Dziękuję za pomoc w rozwoju! Twoja rekomendacja pomaga innym zaufać mnie. Możesz napisać samemu lub odpowiedzieć na kilka pytań (AI wygeneruje krótki szkic do edycji).",
    form: {
      name: "Twoje Imię i Nazwisko",
      namePlaceholder: "Wprowadź swoje pełne imię i nazwisko",
      finalTestimonial: "Twoja Rekomendacja",
      finalTestimonialPlaceholder: "Napisz swoją rekomendację tutaj lub użyj generatora AI poniżej...",
      guidedQuestions: "Opcjonalnie: Odpowiedz na te pytania dla generacji AI",
      before: "Z czym się zmagałeś przed naszymi sesjami?",
      beforeHint:
        'np. "Wiedziałem, że AI ma potencjał, ale nie wiedziałem, jak go wykorzystać w moim biznesie", "Ciągle kopiowałem automatyzacje bez zrozumienia", "Nie wiedziałem, od czego zacząć z narzędziami typu n8n", "Przytłaczała mnie techniczna terminologia i złożoność AI"',
      after: "Co się zmieniło po naszych sesjach? Co zbudowałeś lub w końcu zrozumiałeś?",
      afterHint:
        'np. "Zacząłem wyraźnie dostrzegać, jak AI może wpłynąć na mój biznes", "Zbudowałem swoją pierwszą automatyzację od zera", "Nauczyłem się, jak zamieniać pomysły w działające rozwiązania (konkretne przykłady)"',
      style: "Co wyróżniało sposób nauczania lub mentoringu Krisa?",
      styleHint:
        'Budowanie na żywo z wyjaśnieniem każdego kroku, klarowny tok myślenia, spokój i szczerość (także “nie wiem” w razie potrzeby), pomaga zrozumieć *jak myśleć*, a nie tylko co klikać',
      emotions: "Jak się czułeś podczas i po sesjach?",
      emotionsHint:
        'np. "W końcu poczułem, że jestem w stanie samodzielnie rozwiązywać problemy", "Zrozumiałem, jak samodzielnie budować rozwiązania, bez ślepego kopiowania", "Od przytłoczenia do pewności siebie"',
      whoRecommend: "Komu poleciłbyś Krisa — i dlaczego?",
      whoRecommendHint:
        "Każdemu, kto chce naprawdę zrozumieć, jak działają AI i automatyzacje — szczególnie nietechnicznym założycielom, freelancerom, konsultantom, liderom, managerom i twórcom zagubionym w tutorialach",
      permissions: "Uprawnienia do Użycia",
      permissionFullName: "Możesz użyć mojego pełnego imienia",
      permissionLinkedin: "Możesz użyć linku do mojego profilu LinkedIn",
      permissionPhoto: "Możesz użyć mojego zdjęcia",
      permissionLogo: "Możesz użyć logo mojej firmy",
      permissionPublic: "Możesz publicznie udostępnić tę rekomendację na stronie Krisa",
      generateDraft: "Wygeneruj Szkic AI",
      generating: "Generowanie...",
      preview: "Podgląd",
      submit: "Wyślij Rekomendację",
      submitting: "Wysyłanie...",
      success: "Dziękuję! Twoja rekomendacja została pomyślnie wysłana.",
      error: "Coś poszło nie tak. Spróbuj ponownie.",
    },
  }
}

export type Language = keyof typeof translations
