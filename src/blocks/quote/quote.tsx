import sanitizeHtml from "sanitize-html";
import parse from "html-react-parser";

export default function Quote({
  data,
  style,
  paragraphProps,
  captionProps,
  ...props
}: {
  data: {
    text: string;
    caption?: string;
    alignment?: "left" | "center";
  };
  paragraphProps?: React.HTMLProps<HTMLParagraphElement>;
  captionProps?: React.HTMLProps<HTMLElement>;
} & React.HTMLProps<HTMLQuoteElement>) {
  return (
    <blockquote
      style={{
        paddingInlineStart: "0.8em",
        borderLeft: "4px solid rgba(127, 127, 127, 0.25)",
        ...style,
      }}
      {...props}
    >
      <p
        style={{
          textAlign: data.alignment || "left",
          ...paragraphProps?.style,
        }}
        {...paragraphProps}
      >
        {parse(sanitizeHtml(data.text))}
      </p>
      {data.caption && (
        <>
          <br />
          <cite
            style={{
              textAlign: "right",
              display: "block",
              ...captionProps?.style,
            }}
            {...captionProps}
          >
            {parse(sanitizeHtml(data.caption))}
          </cite>
        </>
      )}
    </blockquote>
  );
}
