import templateImg from '../../assets/imgs/Xeditor-assets/templates1.webp'
import templateImg2 from '../../assets/imgs/Xeditor-assets/templates2.webp'
import templateImg3 from '../../assets/imgs/Xeditor-assets/templates3.webp'
import templateImg4 from '../../assets/imgs/Xeditor-assets/templates4.webp'

export function TemplatesSection() {
  return (
    <section className='templates-section full main-layout'>
      <div className='wrapper'>
        <div className='title-container'>
          <h2>
            <span className='display-2'>Website templates by our in-house design studio.</span>
          </h2>
        </div>
        <div className='cta-container'>
          <p>
            <span className='display-p'>
              Accelerate your next project or get inspired and design from a blank canvas.
            </span>
          </p>
          <button className='btn circled secondary'>
            <span className='display-link'>Start Creating</span>
          </button>
        </div>
      </div>
      <div className='slider flex space-inline-l'>
        <div className='slider-item'>
          <div className='actions'>
            <button className='btn btn-template'>
              <span className='display-link'>View</span>
            </button>
            <button className='btn btn-template'>
              <span className='display-link'>Edit</span>
            </button>
          </div>
          <img src={templateImg} alt='templateImg' />
        </div>
        <div className='slider-item'>
          <div className='actions'>
            <button className='btn btn-template'>
              <span className='display-link'>View</span>
            </button>
            <button className='btn btn-template'>
              <span className='display-link'>Edit</span>
            </button>
          </div>
          <img src={templateImg2} alt='templateImg' />
        </div>
        <div className='slider-item'>
          <div className='actions'>
            <button className='btn btn-template'>
              <span className='display-link'>View</span>
            </button>
            <button className='btn btn-template'>
              <span className='display-link'>Edit</span>
            </button>
          </div>
          <img src={templateImg3} alt='templateImg' />
        </div>
        <div className='slider-item'>
          <div className='actions'>
            <button className='btn btn-template'>
              <span className='display-link'>View</span>
            </button>
            <button className='btn btn-template'>
              <span className='display-link'>Edit</span>
            </button>
          </div>
          <img src={templateImg4} alt='templateImg' />
        </div>
      </div>
    </section>
  )
}
