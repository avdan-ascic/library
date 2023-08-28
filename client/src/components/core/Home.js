import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Image, Header, Container } from "semantic-ui-react";
import { UserContext } from "../../App";
import Logo from "../../assets/images/logo1.png";

const Home = () => {
  const navigate = useNavigate();
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    if (loggedIn) return navigate("/publishers");
    // eslint-disable-next-line
  }, [loggedIn]);

  return (
    <Container
      style={{
        marginTop: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header size="huge" style={{ color: "#204e59" }}>
        Library
      </Header>
      <Image src={Logo} size="medium" />
      <p style={{ fontSize: "1.2em" }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Vestibulum morbi
        blandit cursus risus at ultrices mi. Ridiculus mus mauris vitae
        ultricies leo. In tellus integer feugiat scelerisque varius morbi enim
        nunc faucibus. Augue neque gravida in fermentum et sollicitudin. Commodo
        ullamcorper a lacus vestibulum sed arcu. Et netus et malesuada fames ac
        turpis egestas. Id aliquet risus feugiat in ante metus dictum at. Et
        ligula ullamcorper malesuada proin libero nunc. Non pulvinar neque
        laoreet suspendisse interdum consectetur libero. Bibendum at varius vel
        pharetra. Imperdiet dui accumsan sit amet nulla facilisi morbi. Eget
        arcu dictum varius duis at consectetur lorem donec. Adipiscing elit
        pellentesque habitant morbi tristique senectus et netus et. Mollis nunc
        sed id semper risus in hendrerit gravida rutrum. Vel fringilla est
        ullamcorper eget. Augue ut lectus arcu bibendum at varius vel pharetra
        vel.
        <br />
        At ultrices mi tempus imperdiet nulla malesuada pellentesque elit.
        Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien.
        Fermentum leo vel orci porta non pulvinar neque. Nibh mauris cursus
        mattis molestie. In iaculis nunc sed augue lacus viverra vitae. Pretium
        aenean pharetra magna ac placerat. A cras semper auctor neque vitae
        tempus quam pellentesque. Dolor purus non enim praesent elementum
        facilisis. In pellentesque massa placerat duis ultricies. Ut tristique
        et egestas quis ipsum suspendisse ultrices. Egestas congue quisque
        egestas diam in arcu cursus euismod quis. Faucibus scelerisque eleifend
        donec pretium vulputate sapien nec.
      </p>
    </Container>
  );
};

export default Home;
