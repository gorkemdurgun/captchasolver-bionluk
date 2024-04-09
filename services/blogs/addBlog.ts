import { Axios } from "@/Axios";

export const addBlog = ({
  title,
  tags,
  image
}: {
  title: string;
  tags: string[];
  image?: File;
}) => {
  function imageToBase64(file?: File): Promise<string> {
    if (!file) return Promise.resolve("");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  return imageToBase64(image).then(base64Image => {
    const base64 = base64Image.split(",")[1];
    return Axios.post<Blog>("/addBlog", {
      title,
      //   content,
      tags,
      image: base64
    });
  });
};
