interface FormErrorProps {
  message?: string | string[];
}

export function FormError({ message }: FormErrorProps) {
  if (!message || message.length === 0) return null;

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div className="alert alert-error mb-3 text-sm" role="alert" aria-live="polite">
      <div>
        {messages.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
}
