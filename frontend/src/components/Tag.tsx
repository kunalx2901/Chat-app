import tag from "../assets/convo_page.png"
export default function Tag() {
  return (
    <div className="bg-white flex justify-center items-center flex-col min-h-screen z-5 ">
        <img src={tag} alt="" width={800}/>
        <h1 className="text-3xl font-bold font-serif mb-15 relative bottom-20">Seamless Conversations, 
            <br />Anytime, 
            <br />Anywhere."  🚀💬</h1>
    </div>
    )
}
