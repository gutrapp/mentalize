export const cpfFormatacao = (value: string) => {
  if (!value) return "";
  if (!value.match(/[0-9]+/)) return "";
  return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const cepFormatacao = (value: string) => {
  if (!value) return "";
  if (!value.match(/[0-9]+/)) return "";
  return value.replace(/(\d{5})(\d{3})/, "$1-$2");
};

export const dateFortmatter = (data: string) => {
  return data.split("/").reverse().join("-");
};
