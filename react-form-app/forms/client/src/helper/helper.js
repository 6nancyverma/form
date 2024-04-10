export function renderError(field, errors) {
  return errors[field] && <div className="text-red-500">{errors[field]}</div>;
}

export function renderMessage(message, status) {
  return (
    message && (
      <div className={`text-${status === "success" ? "green" : "red"}-500`}>
        {message}
      </div>
    )
  );
}
