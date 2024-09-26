export const isValidInput = (input: string) => {
  const forbiddenPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<[^>]+>/g,
    /[$<>]/g,
  ];

  return !forbiddenPatterns.some((pattern) => pattern.test(input));
};
