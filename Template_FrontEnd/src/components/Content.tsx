import './styles/Content.scss'

function Content() {

    let temp01:{key: number, name: String}[] = [{key : 1, name : 'preview'},{key : 2, name : 'preview'},{key : 3, name : 'preview'},{key : 4, name : 'preview'},{key : 5, name : 'preview'}, {key : 6, name : 'preview'}, {key : 7, name : 'preview'}, {key : 8, name : 'preview'}, {key : 9, name : 'preview'}]
    
    return (
        <div className='Content'>
            <h1>Template</h1>
            <div className='ContentOuter'>
                {temp01.map(temp =>(
                    <div className='Content01' key={temp.key}>
                        <h2 className='ContentInner'>{temp.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Content

