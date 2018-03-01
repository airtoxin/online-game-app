import * as React from 'react';
import {reverse} from 'lodash';
import {Divider, Feed, Form} from 'semantic-ui-react';
import {DraggableCore} from 'react-draggable';
import * as styles from './styles.cssmodules';
import {withFormik} from 'formik';
import User from '../../../shared/models/User';
import {WithSocket} from '../WithSocket';
import {LoungePagePresenter} from './LoungePagePresenter';
import {LoungeChatState} from '../../../shared/models/LoungeChatState';

type ChatSocket = new () => WithSocket<LoungeChatState>;
const ChatSocket = WithSocket as ChatSocket;

export interface Props {
  user: User;
}

export interface FormProps {
  presenter: LoungePagePresenter;
}

export interface State {
  heightDiff: number;
}

export interface ChatSendFormValue {
  message: string;
}

const ChatSendForm = withFormik<Props & FormProps, ChatSendFormValue>({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (values, {props, resetForm}) => {
    const user: User = { name: '', ...props.user };
    await props.presenter.handleSubmitChatMessage(user, values);
    resetForm();
  },
})(({
  values,
  handleChange,
  handleSubmit,
}) => (
  <Form onSubmit={handleSubmit}>
    <Form.Input
      name='message'
      fluid
      action='送信'
      placeholder='Hi, ...'
      value={values.message}
      onChange={handleChange}
    />
  </Form>
));

const defaultChatAreaHeight = '5em';

class LoungePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      heightDiff: 0,
    };
  }

  render() {
    return (
      <ChatSocket
        host='localhost'
        port={2008}
        path='lounge-chat'
        initialData={{ messages: [] }}
        render={(socket, chatMessages) => {
          const presenter = new LoungePagePresenter(socket);
          return (
            <div className={styles.container}>
              <div className={styles.mainArea}>
                <h1>{this.props.user.name}</h1>
              </div>
              <DraggableCore
                onDrag={(_e, data) => this.setState({ heightDiff: this.state.heightDiff + data.deltaY })}
              >
                <Divider horizontal className={styles.divider}>
                  ラウンジチャット
                </Divider>
              </DraggableCore>
              <div>
                <Feed className={styles.chatArea} style={{
                  height: `calc(${defaultChatAreaHeight} - ${this.state.heightDiff}px)`,
                }}>
                  {
                    reverse(chatMessages.messages).map(message => (
                      <Feed.Event key={message.id}>
                        <Feed.Label icon={message.user.id === this.props.user.id ? 'user' : 'user outline'} />
                        <Feed.Content>
                          {message.message}
                        </Feed.Content>
                        <Feed.Date>{message.createdAt}</Feed.Date>
                      </Feed.Event>
                    ))
                  }
                </Feed>
                <ChatSendForm {...this.props} presenter={presenter}/>
              </div>
            </div>
          );
        }}
      />
    );
  }
}

export default LoungePage;
