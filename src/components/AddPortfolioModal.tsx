import { Check, X } from 'lucide-react';
import { type FormEvent, useEffect, useState } from 'react';

export type AccessModalMode = 'create' | 'login';

interface AddPortfolioModalProps {
  mode: AccessModalMode | null;
  onClose: () => void;
}

const MODAL_COPY: Record<
  AccessModalMode,
  {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
  }
> = {
  create: {
    eyebrow: 'პორტფოლიოს შექმნა · მალე გაეშვება',
    title: 'შექმენი შენი rgoli.ge/[slug]',
    description:
      'რგოლი ამჟამად დახურულ ბეტა რეჟიმშია. დატოვე ელფოსტა და პირველს გაგიგზავნით მოწვევას, როგორც კი პორტფოლიოს შექმნა გაიხსნება.',
    cta: 'მოწვევის მოთხოვნა',
  },
  login: {
    eyebrow: 'შესვლა · მალე გაეშვება',
    title: 'კრეატორის კაბინეტი მალე გაიხსნება',
    description:
      'ავტორიზაცია და პროფილის თვითმართვის პანელი ბეტა ეტაპზეა. დატოვე შენი ელფოსტა, რომ გაშვებისთანავე შეგატყობინოთ.',
    cta: 'შემატყობინე გაშვებისას',
  },
};

export function AddPortfolioModal({ mode, onClose }: AddPortfolioModalProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isOpen = mode !== null;

  useEffect(() => {
    setEmail('');
    setSubmitted(false);
  }, [mode]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mode) {
    return null;
  }

  const copy = MODAL_COPY[mode];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="access-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[440px] rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="დახურვა"
          className="absolute top-5 right-5 inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#6B7280] transition-colors hover:bg-[#F8F9FA] hover:text-[#0D0E11]"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F9FA] text-[#0D0E11] ring-1 ring-[#E5E7EB]">
              <Check className="h-5 w-5 text-[#00C84B]" />
            </div>
            <h2
              id="access-modal-title"
              className="mt-5 text-[20px] font-bold tracking-[-0.02em] text-[#0D0E11]"
            >
              მადლობა, მისამართი ჩანიშნულია
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">
              როგორც კი ფუნქციონალი გაიხსნება, შეტყობინებას გამოგიგზავნით
              მისამართზე{' '}
              <span className="font-medium text-[#0D0E11]">{email}</span>.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 w-full cursor-pointer rounded-full bg-[#0D0E11] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#00E054] hover:text-[#0D0E11]"
            >
              დახურვა
            </button>
          </div>
        ) : (
          <div>
            <p className="text-[12px] font-medium text-[#6B7280]">
              {copy.eyebrow}
            </p>
            <h2
              id="access-modal-title"
              className="mt-2 pr-8 text-[22px] font-bold leading-snug tracking-[-0.025em] text-[#0D0E11]"
            >
              {copy.title}
            </h2>
            <p className="mt-2.5 text-[14px] leading-relaxed text-[#6B7280]">
              {copy.description}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div>
                <label htmlFor="waitlist-email" className="sr-only">
                  ელფოსტა
                </label>
                <input
                  id="waitlist-email"
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-[#E5E7EB] bg-[#F8F9FA] px-4 py-3 text-[14px] text-[#0D0E11] placeholder:text-[#6B7280]/70 transition-colors focus:border-[#0D0E11] focus:bg-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-[#0D0E11] px-4 py-3 text-[13px] font-medium text-white transition-colors hover:bg-[#00E054] hover:text-[#0D0E11]"
              >
                {copy.cta}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
