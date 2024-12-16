import './styles/Home.scss'

function Home() {
  return (
    <>
        <div className='empty'></div>
        <main className="HMainOuter">
            <main className="HMainInner">
                <div className='HOne'>
                    <h1>Create your own Portfolio</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa esse corrupti obcaecati aliquam dolores assumenda maiores deserunt excepturi quos expedita tenetur, quae id, incidunt, quo possimus error natus eum ipsam.</p>
                </div>
                <div className='HTwo noEffect'>
                    <button>View More</button>
                </div>
                <div className='HThree'>
                    <div className='HThree01'><h1>$Fonts</h1></div>
                    <div className='HThree02'><h1>$Colors</h1></div>
                </div>
            </main>
        </main>
        <div className='empty'></div>
    </>
  )
}

export default Home

