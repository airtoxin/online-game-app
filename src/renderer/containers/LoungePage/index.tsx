import * as React from 'react';
import {connect} from 'react-redux';
import {UserState} from '../../modules/user';
import {GlobalState} from '../../modules';
import {Divider, Feed, Input} from 'semantic-ui-react';
import {DraggableCore} from 'react-draggable';
import * as styles from './styles.cssmodules';

export interface Props {
  user: UserState;
}

export interface State {
  heightDiff: number;
}

class LoungePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      heightDiff: 0,
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.mainArea}>
          <h1>{this.props.user.name}</h1>
        </div>
        <DraggableCore
          onDrag={(_e, data) => this.setState({ heightDiff: this.state.heightDiff + data.deltaY })}
        >
          <Divider horizontal className={styles.divider}>
            Chat
          </Divider>
        </DraggableCore>
        <div>
          <Feed className={styles.chatArea} style={{
            height: `calc(5em - ${this.state.heightDiff}px)`,
          }}>
            {
              Array.from(Array(100).keys()).map(() => (
                <>
                  <Feed.Event>
                    <Feed.Label icon='user' />
                    <Feed.Content>
                      You added Elliot Fu to the group <a>Coworkers</a>
                    </Feed.Content>
                  </Feed.Event>
                  <Feed.Event>
                    <Feed.Label icon='user outline' />
                    <Feed.Content>
                      You added Elliot Fu to the group <a>Coworkers</a>
                    </Feed.Content>
                  </Feed.Event>
                </>
              ))
            }
          </Feed>
          <Input fluid action='送信' placeholder='Hi, ...' />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: GlobalState) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LoungePage);
