import React from 'react';
import { connect } from 'react-redux';
import { ThemeProvider, FixedWrapper, darkTheme } from '@livechat/ui-kit';
import MinimizedIcon from 'app/components/modules/chat/MinimizedIcon';
import ChatMain from 'app/components/modules/chat/ChatMain';

class ChatWrapper extends React.Component {

    constructor(props) {
        super(props);
        this.state = { conversation: null, newConversation: false };
    }

    render() {
        const { preferHive, defaultChatConversations, nightmodeEnabled } = this.props;
        const { conversation, newConversation } = this.state;
        const setConversation = (conversation) => this.setState({ conversation });
        const setNewConversation = (newConversation) => this.setState({ newConversation });
        const theme = nightmodeEnabled ? darkTheme : { vars: { 'primary-color': 'grey' }};
        theme.FixedWrapperMaximized = {
            css: {
                height: '600px',
            },
        };
        if (!preferHive || !defaultChatConversations || !this.props.currentUsername) {
            return null;
        }
        return (
            <ThemeProvider theme={theme} >
                <FixedWrapper.Root>
                    <FixedWrapper.Maximized>
                        <ChatMain conversation={conversation} newConversation={newConversation} setConversation={setConversation} setNewConversation={setNewConversation} />
                    </FixedWrapper.Maximized>
                    <FixedWrapper.Minimized>
                        <MinimizedIcon />
                    </FixedWrapper.Minimized>
                </FixedWrapper.Root>
            </ThemeProvider>
        );
    }
}

export default connect(
    (state, ownProps) => {
        const currentUsername = state.user.getIn(['current', 'username']);
        const defaultChatConversations = state.app.getIn(['hostConfig', 'CHAT_CONVERSATIONS']);
        const preferHive = state.app.getIn(['hostConfig', 'PREFER_HIVE']);
        return {
            ...ownProps,
            preferHive,
            currentUsername,
            defaultChatConversations,
            nightmodeEnabled: state.app.getIn(['user_preferences', 'nightmode']),
        }
    },
)(ChatWrapper);

