import React from 'react';

class RubricForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.currentUser.id,
            video: this.props.videoId,
            professionalism: 0,
            confidence: 0,
            content: 0,
            voice: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createRubric(this.state);
        setTimeout(() => {
            this.props.fetchVideoRubrics(this.props.videoId);
            document.getElementById('professionalism-box').value = '';
            document.getElementById('confidence-box').value = '';
            document.getElementById('content-box').value = '';
            document.getElementById('voice-box').value = '';
            this.setState({
                user: this.props.currentUser.id,
                video: this.props.videoId,
                professionalism: 0,
                confidence: 0,
                content: 0,
                voice: 0
            });

        }, 0);
    }

    update(property) {
        return e => this.setState({ [property]: e.currentTarget.value });
    }


    render() {
        return (
            <div className="rubric-form-container">

                <form className="rubric-form" onSubmit={this.handleSubmit}>

                    <div className='send-rubric-button'>
                        <h2 className="title">
                            Give
                            <br />
                            your
                            <br />
                            scores</h2>
                        <button type="submit" onChange={this.change}>Send</button>
                    </div>

                    <div className='rubric-form-inputs'>
                        <label>Professionalism</label>
                        <input
                            className='input1'
                            id="professionalism-box"
                            type="number"
                            value={this.state.professionalism}
                            min="1" 
                            max="5"
                            onChange={this.update("professionalism")
                        }
                        />

                        <label>Confidence</label>
                        <input
                            className='input2'
                            id="confidence-box"
                            type="number"
                            value={this.state.confidence}
                            min="1"
                            max="5"
                            onChange={this.update("confidence")}
                        />
                        

                        <label>Content</label>
                        <input
                            className='input3'
                            id="content-box"
                            type="number"
                            value={this.state.content}
                            min="1"
                            max="5"
                            onChange={this.update("content")}
                        />
                        

                        <label>Voice</label>
                        <input
                            className='input4'
                            id="voice-box"
                            type="number"
                            value={this.state.voice}
                            min="1"
                            max="5"
                            onChange={this.update("voice")}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default RubricForm;