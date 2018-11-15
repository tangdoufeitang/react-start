import * as React from 'react';
import { hot } from 'react-hot-loader';
import style from './style.less';

type Props = {

};
type State = {

};
class App extends React.PureComponent<Props, State> {
    render () {
        return (
            <div className={style.color}>这是React</div>
        );
    }
}

export default hot(module)(App);
