import {
  Icon,
  Divider,
  Card,
  Image,
  Header,
  Container,
} from "semantic-ui-react";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../App";
import Avatar1 from "../../assets/images/avatar1.png";
import Avatar2 from "../../assets/images/avatar2.png";
import Avatar3 from "../../assets/images/avatar3.png";

const StyledCardsDiv = styled.div`
  @media (max-width: 992px) {
    flex-direction: column !important;
  }
`;

const OurTeam = () => {
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: "#204e59",
        }}
      >
        <Icon name="users" size="big" style={{ marginRight: "1rem" }} />
        <Header size="huge" style={{ marginTop: 0, color: "#204e59" }}>
          Our Team
        </Header>
      </div>
      <Divider style={{ width: "100%" }} />
      <StyledCardsDiv
        style={{ display: "flex", marginBottom: "5rem", gap: "2rem" }}
      >
        <div>
          <Card style={{ height: "550px" }}>
            <Image src={Avatar1} style={{ height: "300px" }} />
            <Card.Content>
              <Card.Header style={{ color: "#204e59" }}>
                George Clooney
              </Card.Header>
              <Card.Meta>Developer</Card.Meta>
              <Card.Description>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit.
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
        <div>
          <Card style={{ height: "550px" }}>
            <Image
              src={Avatar2}
              style={{
                height: "300px",
              }}
            />
            <Card.Content>
              <Card.Header style={{ color: "#204e59" }}>
                Maryl Streep
              </Card.Header>
              <Card.Meta>UI/UX Designer</Card.Meta>
              <Card.Description>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui
                blanditiis praesentium voluptatum deleniti atque corrupti quos
                dolores et quas molestias excepturi sint occaecati cupiditate
                non provident, similique sunt in culpa qui officia deserunt
                mollitia animi, id est laborum et dolorum fuga.
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
        <div>
          <Card style={{ height: "550px" }}>
            <Image src={Avatar3} style={{ height: "300px" }} />
            <Card.Content>
              <Card.Header style={{ color: "#204e59" }}>
                Antonio Banderas
              </Card.Header>
              <Card.Meta>QA Engineer</Card.Meta>
              <Card.Description>
                Fermentum odio eu feugiat pretium nibh ipsum. Enim praesent
                elementum facilisis leo vel fringilla est. Ut consequat semper
                viverra nam libero justo laoreet sit amet. Est sit amet
                facilisis magna etiam tempor. Vel quam elementum pulvinar etiam
                non quam lacus.
              </Card.Description>
            </Card.Content>
          </Card>
        </div>
      </StyledCardsDiv>
    </Container>
  );
};

export default OurTeam;
