import React, {useContext} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Button, Card, Grid, Image, Icon, Label } from "semantic-ui-react"; 
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/auth";
import DeleteButton from "../components/DeleteButton";
import moment from "moment";



function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  console.log(postId);

  const {
    data: { getPost } = {}
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  function deletePostCallback() {
    props.history.push('/')
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading Post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      userName,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              float="right"
              size="small"
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <hr /> 
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likeCount, likes }}/>
                <Button as="div" labelPosition="right" onClick={() => console.log('Comment on Post')}>
                  <Button basic color="blue">
                    <Icon name="comments"/>
                  </Button>
                  <Label basic color="blue" pointing="left">{commentCount}</Label>
                </Button>
                { user && userName === userName && (
                  <DeleteButton postId={id} callback={deletePostCallback}/>
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return postMarkup;
}

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      userName
      likeCount
      likes {
        userName
      }
      commentCount
      comments {
        id
        userName
        createdAt
        body
      }
    }
  }
`;

export default SinglePost;
