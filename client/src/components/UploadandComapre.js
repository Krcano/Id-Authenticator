// will need this
const [file, setFile] = useState();
const [image, setImage] = useState();
useEffect(() => {
  const getImage = () => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      setImage({
        url: img.src,
        width: img.width,
        height: img.height,
      });
    };
  };
  file && getImage();
}, [file]);
console.log(image);
