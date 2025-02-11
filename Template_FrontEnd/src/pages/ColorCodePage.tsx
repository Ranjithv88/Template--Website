import "./styles/ColorCodePage.scss"
import NavigationBar from "../components/NavigationBar"
import Color from "../components/Color"
import Footer from "../components/Footer"

function ColorCodePage() {
  return (
    // ColorCodePage Html tags 
    <div className="ColorCodePage" >
        <NavigationBar/>
        <Color/>
        <Footer/>
    </div>
  )
}

export default ColorCodePage

 