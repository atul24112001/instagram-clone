import { ImgHTMLAttributes, useState } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement>;

export default function Image({ src, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <img
        onLoad={() => {
          setLoaded(true);
        }}
        className={`${loaded ? "block" : "hidden"}`}
        src={src}
        loading="lazy"
        {...rest}
      />

      <img
        src={`${src}-100`}
        loading="lazy"
        className={`${!loaded ? "block" : "hidden"}`}
        {...rest}
      />
    </div>
  );
}
