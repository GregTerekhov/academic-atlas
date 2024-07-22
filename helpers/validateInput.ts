export const escapeHtml = (str: string) => {
  return str.replace(/[&<>"'\/]/g, (s) => {
    const entityMap: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;',
    };

    return entityMap[s] || s;
  });
};

export const isValidInput = (input: string) => {
  const forbiddenPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<[^>]+>/g,
    /[$<>]/g,
  ];

  return !forbiddenPatterns.some((pattern) => pattern.test(input));
};
