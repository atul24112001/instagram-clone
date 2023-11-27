export const base64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      if (result) {
        resolve(result);
      }
      reject(Error("Something went wrong"));
    };
    reader.readAsDataURL(file);
  });
};
