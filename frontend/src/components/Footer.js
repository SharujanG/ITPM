

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer style={{backgroundColor:"#30C621",height:"10vh",}}>
        <div style={{marginLeft:"650px"}}>{`Copyright © Upbeat Code ${year}`}
        </div>
        </footer>;
  };
  
  export default Footer;