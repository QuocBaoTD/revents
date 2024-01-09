import { Comment, Header, Segment } from "semantic-ui-react";
import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import { ChatComment } from "../../../App/types/events";
import { onChildAdded, ref } from "firebase/database";
import { fb } from "../../../App/config/firebase";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

type Props = {
  eventId: string;
};

function EventDetailChat({ eventId }: Props) {
  const [comments, setComments] = useState<ChatComment[]>([]);
  const [replyForm, setReplyForm] = useState<any>({
    open: false,
    commentId: null,
  }); //set up value and property to handle replyForm

  //try to make the firebase listen
  useEffect(
    function () {
      const chatRef = ref(fb, `chat/${eventId}`);
      const unsubcribe = onChildAdded(chatRef, (data) => {
        const commnent = { ...data.val(), id: data.key };
        setComments((prevState) => [...prevState, commnent]);
      });
      return () => unsubcribe();
    },
    [eventId]
  );

  function createCommentTree(data: ChatComment[]) {
    const table = Object.create(null); //create the empty object
    data.forEach((item) => (table[item.id] = { ...item, childNodes: [] }));

    const dataTree: ChatComment[] = [];
    data.forEach((item) => {
      if (item.parentId) table[item.parentId].childNodes.push(table[item.id]);
      //check ing if the comment has parent commnent so childcomment can push comment mean user can reply the comment
      else dataTree.push(table[item.id]);
    });
    return dataTree;
  }

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached style={{ height: 400, overflowY: "scroll" }}>
        <ChatForm eventId={eventId} />
        <Comment.Group style={{ paddingBottom: 0, marginBottom: 0 }}>
          {createCommentTree(comments).reverse().map(
            (
              comment //implement the parentcomment
            ) => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || "/user.png"} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profiles/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, new Date())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() =>
                        setReplyForm({ open: true, commentId: comment.id })
                      }
                    >
                      Reply
                    </Comment.Action>

                    {replyForm.open &&
                      replyForm.commentId === comment.id && ( //check the id of event and comment is compatible with comment  id and eventid if compatiion so implement the reply.
                        <ChatForm
                          key={comment.id}
                          eventId={eventId}
                          parentId={comment.id}
                          setReplyForm={setReplyForm}
                        />
                      )}
                  </Comment.Actions>
                </Comment.Content>

                <Comment.Group styple={{ paddingBottom: 0 }}>
                  {comment.childNodes.map(
                    (
                      child //implement the childComment
                    ) => (
                      <Comment key={child.id}>
                        <Comment.Avatar src={child.photoURL || "/user.png"} />
                        <Comment.Content>
                          <Comment.Author
                            as={Link}
                            to={`/profiles/${child.uid}`}
                          >
                            {child.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>
                              {formatDistance(child.date, new Date())} ago
                            </div>
                          </Comment.Metadata>
                          <Comment.Text>{child.text}</Comment.Text>
                          <Comment.Actions>
                            <Comment.Action
                              onClick={() =>
                                setReplyForm({
                                  open: true,
                                  commentId: child.id,
                                })
                              }
                            >
                              Reply
                            </Comment.Action>

                            {replyForm.open &&
                              replyForm.commentId === child.id && ( //check the id of event and comment is compatible with comment  id and eventid if compatiion so implement the reply.
                                <ChatForm
                                  key={comment.id}
                                  eventId={eventId}
                                  parentId={child.parentId}
                                  setReplyForm={setReplyForm}
                                />
                              )}
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    )
                  )}
                </Comment.Group>
              </Comment>
            )
          )}
        </Comment.Group>
      </Segment>
    </>
  );
}

export default EventDetailChat;
