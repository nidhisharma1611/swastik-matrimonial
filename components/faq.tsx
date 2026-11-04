type Item = { question: string; answer: string };

export function Faq({ items }: { items: Item[] }) {
  return (
    <div>
      {items.map((item, index) => (
        <details
          className={`group border-t border-line py-5 ${index === items.length - 1 ? "border-b" : ""}`}
          key={item.question}
        >
          <summary className="flex cursor-pointer list-none justify-between gap-5 font-extrabold after:text-xl after:text-wine after:content-['+'] group-open:after:content-['−']">
            {item.question}
          </summary>
          <p className="mt-4 max-w-[650px] text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
