const Youtube = ({data}: { data: { url: string } }) => {
  const videoID = data.url.match(/(?<=v=)[a-zA-Z0-9_]+(?=&?)/)
  if (!videoID) {
    throw new Error("Invalid video url!")
  }
  return (
    <div style={{
      padding: 20
    }}>
    <div style={{
      position: "relative",
      paddingBottom: "56.25%",
      height: 0
    }}>
      <iframe
        allowFullScreen
        src={`https://www.youtube.com/embed/${videoID}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: 0
        }}/>
    </div>
    </div>
  );
};

export default Youtube;