import React from 'react';
import { Link } from 'react-router-dom';

class PostVideoForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {question: '', file: null, views: 0, experience: '', industry: '', user: this.props.currentUser.id }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.redirectToShow = this.redirectToShow.bind(this)
    this.handleRedirect = this.handleRedirect.bind(this);
    this.goBack = this.goBack.bind(this); 
  }

  handleSubmit(e) {
    // console.log(this.props)
    e.preventDefault();
    this.props.createVideo(this.state, this.props.currentUser.id)

    this.redirectToShow()
  }

  handleChange(key) {
    return e => {
      if (key === 'question' || key === 'experience' || key === 'industry') {
        this.setState({[key]: e.currentTarget.value})
      } else {
        this.setState({[key]: e.target.files[0]});
        alert('file attached');
        
      }
    }
  }

  async redirectToShow() {
    this.props.fetchAllVideos()
    setTimeout(() => { this.handleRedirect()}, 2000)
  }

  handleRedirect() {
    let newVideoId
    Object.keys(this.props.videos).reverse().every(key => {
      if (this.props.videos[key].user === this.props.currentUser.id) {
        newVideoId = this.props.videos[key]._id
        this.props.history.push(`/videos/${newVideoId}`)
        return false
      }
    })

      if (newVideoId === undefined) this.props.history.push('/')
    }

    goBack(){
      this.props.history.goBack();
      return false;
    }

  render() {
    return (
      <div className='create-form-background'>
        <form className="vf">
          <div className='vf-title'>
            <h1>Upload interview response</h1>
            <Link to="/videoindex">
              <button onClick={() => this.goBack} className="close-button">
                <span aria-hidden="true">&times;</span>
              </button>
            </Link>
          </div>

          <div className='vf-info'>

            <div className='vf-upload-container'>
              <input className='vf-upload' type="file" onChange={this.handleChange('file')} style={this.state.file ? { backgroundImage: `url(https://pinspire-seeds.s3.us-east-1.amazonaws.com/success.png)` } : { backgroundImage: `url(https://pinspire-seeds.s3.us-east-1.amazonaws.com/videoupload.png)`} }>
              </input>
              <span className='upload-text'>Drag and drop your video to upload</span>
              <button className='vf-submit' onClick={this.handleSubmit}>Submit</button>
            </div>

            <div className='vf-detail-container'>
                <h2>Tell us about yourself and your video</h2>

                <input list ="question" 
                  id='vf-question' 
                  type="text" 
                  placeholder="What interview question are you responding to?" 
                  value={this.state.question} 
                  onChange={this.handleChange('question')}>
                </input>
                <datalist id="question">
                  <option value="Tell me about yourself."></option>
                  <option value="What is your greatest strength?"></option>
                  <option value="What is your greatest weakness?"></option>
                  <option value="Describe a time you handled a stressful situation."> </option>
                  <option value="Tell me about a time when you failed and how you overcame it."></option>
                </datalist>
        
                <input list="industry"
                  id='vf-industry' 
                  type="text" 
                  placeholder="What industry are you in?" 
                  value={this.state.industry} 
                  onChange={this.handleChange('industry')}>
                </input>
                <datalist id="industry">
                  <option value="Communication Services" />
                  <option value="Consumer Discretionary" />
                  <option value="Energy" />
                  <option value="Financials" />
                  <option value="Health Care" />
                  <option value="Information Technology" />
                  <option value="Materials" />
                  <option value="Real Estate" />
                  <option value="Utilities" />
                </datalist>

                <input list="experience" 
                  id='vf-experience' 
                  type="text" 
                  placeholder="What work experience do you have?" 
                  value={this.state.experience} 
                  onChange={this.handleChange('experience')}>
                </input>
                <datalist id="experience">
                  <option value="Entry-level" />
                  <option value="Intermediate/experienced level" />
                  <option value="First-level management" />
                  <option value="Mid-level management" />
                  <option value="Senior/Executive management" />
                </datalist>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default PostVideoForm;