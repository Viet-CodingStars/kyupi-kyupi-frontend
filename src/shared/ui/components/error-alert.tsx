type ErrorAlertProps = {
  message: string;
};

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
      {message}
    </div>
  );
}
