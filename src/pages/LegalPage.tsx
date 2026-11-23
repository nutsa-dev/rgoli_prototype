import { ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import type { LayoutOutletContext } from '../components/Layout';
import {
  LEGAL_DOCUMENTS,
  LEGAL_DOCUMENT_LIST,
  type LegalDocType,
} from '../data/legalDocuments';

interface LegalPageProps {
  doc: LegalDocType;
}

export function LegalPage({ doc }: LegalPageProps) {
  const { openCookieSettings } = useOutletContext<LayoutOutletContext>();
  const content = LEGAL_DOCUMENTS[doc];

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-[#6B7280] transition-colors duration-200 hover:text-[#0D0E11]"
        >
          <ArrowLeft className="h-4 w-4" />
          მთავარზე დაბრუნება
        </Link>

        {/* Document Header */}
        <header className="mt-8 border-b border-[#E5E7EB] pb-8">
          <span className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[12px] font-medium text-[#6B7280]">
            {content.documentCode}
          </span>

          <h1 className="mt-4 text-[26px] font-bold leading-[1.25] tracking-[-0.025em] text-[#0D0E11] sm:text-[34px]">
            {content.title}
          </h1>

          <div className="mt-4 space-y-1 text-[13px] text-[#6B7280]">
            {content.operator && <p>{content.operator}</p>}
            <p>{content.effectiveDate}</p>
          </div>
        </header>

        {/* Legal Notice Callout */}
        {content.legalNotice && (
          <aside className="mt-8 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6">
            <p className="text-[12px] font-semibold uppercase tracking-[0.06em] text-[#6B7280]">
              {content.legalNoticeLabel ?? 'სამართლებრივი შეტყობინება'}
            </p>
            <p className="mt-2 text-[14px] leading-[1.8] text-[#0D0E11]/85">
              {content.legalNotice}
            </p>
          </aside>
        )}

        {/* Articles */}
        <div className="mt-10 space-y-10">
          {content.articles.map((article) => (
            <section
              key={article.heading}
              className="border-b border-[#E5E7EB]/70 pb-9 last:border-b-0 last:pb-0"
            >
              <h2 className="text-[18px] font-bold leading-snug tracking-[-0.015em] text-[#0D0E11] sm:text-[19px]">
                {article.heading}
              </h2>

              {article.intro && (
                <p className="mt-3 text-[15px] leading-[1.8] text-[#0D0E11]/85">
                  {article.intro}
                </p>
              )}

              {article.clauses && article.clauses.length > 0 && (
                <div className="mt-4 space-y-4">
                  {article.clauses.map((clause, idx) => (
                    <div key={`${article.heading}-clause-${idx}`}>
                      <p className="text-[15px] leading-[1.8] text-[#0D0E11]/85">
                        {clause.text}
                      </p>

                      {clause.subItems && clause.subItems.length > 0 && (
                        <ul className="mt-2.5 space-y-2.5 pl-5 sm:pl-6">
                          {clause.subItems.map((subItem, subIdx) => (
                            <li
                              key={`${article.heading}-clause-${idx}-sub-${subIdx}`}
                              className="text-[14.5px] leading-[1.8] text-[#0D0E11]/80"
                            >
                              {subItem}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {article.bullets && article.bullets.length > 0 && (
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#9CA3AF]">
                  {article.bullets.map((bullet, idx) => (
                    <li
                      key={`${article.heading}-bullet-${idx}`}
                      className="text-[15px] leading-[1.8] text-[#0D0E11]/85"
                    >
                      {bullet.lead && (
                        <strong className="font-semibold text-[#0D0E11]">
                          {bullet.lead}{' '}
                        </strong>
                      )}
                      <span>{bullet.text}</span>
                      {bullet.subNote && (
                        <p className="mt-1 text-[13.5px] italic leading-relaxed text-[#6B7280]">
                          {bullet.subNote}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {article.table && (
                <div className="mt-5 overflow-x-auto rounded-xl border border-[#E5E7EB] bg-white">
                  <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-[13px]">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] bg-[#F8F9FA]">
                        {article.table.headers.map((header, headerIdx) => {
                          const widthClass =
                            headerIdx === 0
                              ? 'w-[20%]'
                              : headerIdx === 1
                                ? 'w-[20%]'
                                : headerIdx === 2
                                  ? 'w-[14%]'
                                  : headerIdx === 3
                                    ? 'w-[13%]'
                                    : 'w-[33%]';
                          return (
                            <th
                              key={header}
                              className={`${widthClass} px-3 py-3 align-top font-semibold leading-snug text-[#0D0E11]`}
                            >
                              {header}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E7EB]">
                      {article.table.rows.map((row, rowIdx) => (
                        <tr
                          key={`${article.heading}-row-${rowIdx}`}
                          className="align-top"
                        >
                          {row.map((cell, cellIdx) => {
                            const cellClass =
                              cellIdx === 0
                                ? 'w-[20%] break-words font-mono text-[12px] font-medium text-[#0D0E11]'
                                : cellIdx === 1
                                  ? 'w-[20%] break-words text-[#0D0E11]/80'
                                  : cellIdx === 2
                                    ? 'w-[14%] break-words text-[#0D0E11]/80'
                                    : cellIdx === 3
                                      ? 'w-[13%] whitespace-nowrap text-[#0D0E11]/80'
                                      : 'w-[33%] break-words text-[#0D0E11]/80';
                            return (
                              <td
                                key={`${article.heading}-row-${rowIdx}-cell-${cellIdx}`}
                                className={`${cellClass} px-3 py-3 align-top leading-relaxed`}
                              >
                                {cell}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {article.note && (
                <p className="mt-4 rounded-xl bg-[#F8F9FA] px-4 py-3 text-[13px] leading-relaxed text-[#6B7280] ring-1 ring-inset ring-[#E5E7EB]">
                  {article.note}
                </p>
              )}
            </section>
          ))}
        </div>

        {/* Cookie Preferences Shortcut on Cookie Policy Page */}
        {doc === 'cookies' && (
          <div className="mt-10 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:flex sm:items-center sm:justify-between sm:gap-4">
            <div>
              <p className="text-[14px] font-semibold text-[#0D0E11]">
                ქუქი-ფაილების პარამეტრების მართვა
              </p>
              <p className="mt-1 text-[13px] text-[#6B7280]">
                შეგიძლიათ ნებისმიერ დროს შეცვალოთ თქვენი თანხმობა ფუნქციურ და
                ანალიტიკურ ქუქი-ფაილებზე.
              </p>
            </div>
            <button
              type="button"
              onClick={openCookieSettings}
              className="mt-4 inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full bg-[#0D0E11] px-4 py-2.5 text-[13px] font-medium text-white transition-colors hover:bg-[#00E054] hover:text-[#0D0E11] sm:mt-0"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span>ქუქი-ფაილების პარამეტრები</span>
            </button>
          </div>
        )}

        {/* Cross-Navigation Across Official Legal Documents */}
        <nav
          aria-label="იურიდიული დოკუმენტების ნავიგაცია"
          className="mt-14 border-t border-[#E5E7EB] pt-8"
        >
          <p className="text-[12px] font-medium text-[#6B7280]">
            ყველა იურიდიული დოკუმენტი
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {LEGAL_DOCUMENT_LIST.map((item) => {
              const isCurrent = item.id === doc;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    isCurrent
                      ? 'border-[#0D0E11] bg-[#0D0E11] text-white'
                      : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#0D0E11]/35 hover:text-[#0D0E11]'
                  }`}
                >
                  {item.navLabel}
                </Link>
              );
            })}
          </div>
        </nav>
      </main>
  );
}
