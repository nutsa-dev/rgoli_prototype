import { Check } from 'lucide-react';
import { type FormEvent, useState } from 'react';

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-2xl font-bold tracking-tight text-[#0D0E11] sm:text-3xl">
        დაგვიკავშირდით
      </h1>

      <section aria-label="შეტყობინების ფორმა" className="mt-8">
        {submitted ? (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center">
            <div className="mx-auto inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F8F9FA]">
              <Check className="h-5 w-5 text-[#00C84B]" />
            </div>
            <p className="mt-4 text-[17px] font-semibold text-[#0D0E11]">
              შეტყობინება გაიგზავნა
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 cursor-pointer rounded-full border border-[#E5E7EB] bg-[#F8F9FA] px-4 py-2 text-[13px] font-medium text-[#0D0E11] transition-colors hover:border-[#0D0E11]"
            >
              ახალი შეტყობინება
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="contact-name"
                className="block text-[12px] font-medium text-[#6B7280]"
              >
                სახელი
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="თქვენი სახელი"
                className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#0D0E11] placeholder:text-[#6B7280]/70 transition-colors focus:border-[#0D0E11] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="block text-[12px] font-medium text-[#6B7280]"
              >
                ელფოსტა
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
                className="mt-1.5 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#0D0E11] placeholder:text-[#6B7280]/70 transition-colors focus:border-[#0D0E11] focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="block text-[12px] font-medium text-[#6B7280]"
              >
                შეტყობინება
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="მოგვწერეთ შეკითხვა ან შეთავაზება..."
                className="mt-1.5 w-full resize-none rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] leading-relaxed text-[#0D0E11] placeholder:text-[#6B7280]/70 transition-colors focus:border-[#0D0E11] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer rounded-full bg-[#0D0E11] px-5 py-3 text-[14px] font-medium text-white transition-colors duration-200 hover:bg-[#00E054] hover:text-[#0D0E11]"
            >
              გაგზავნა
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
