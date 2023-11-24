/**
 *  This function interpolates the all variables in the given string.
 *
 * @param {InterpolationParameters} parameters An object containing:
 *  - template: A string containing placeholders to be replaced.
 *  - options: An object mapping placeholder names to their replacement values.
 *  - wrapWith (optional): A function that takes a placeholder name and returns it in a transformed format.
 *
 * @returns {string} The template string with placeholders replaced by their corresponding values.
 */

type InterpolationParameters = {
  template: string;
  options: Record<string, unknown>;
  wrapWith?: (value: string) => string;
};

const wrapWithDefaultTemplate = (value: string): string => {
  return `{${value}}`;
};

const interpolate = (parameters: InterpolationParameters): string => {
  const { template, options, wrapWith = wrapWithDefaultTemplate } = parameters;
  let result = template;

  for (const [placeholder, value] of Object.entries(options)) {
    result = result.replaceAll(wrapWith(placeholder), String(value));
  }

  return result;
};

export { type InterpolationParameters, interpolate };
