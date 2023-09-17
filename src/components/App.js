import React, { useState, useEffect } from 'react';
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import SaveModal from './SaveModal';

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  const [minimize, setMinimize] = useState(false)
  const [saveModalisOpen, setSaveModalisOpen] = useState(false)
  const [savedTemplates, setSavedTemplates] = useState([])
  const [templateName, setTemplateName] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [testVariable, setTestVariable] = useLocalStorage('testVariable', null)


  /* Note for Hiring Manager: 
    this useEffect prevent the iframe from immediately rendering the code
    when the user is typing. It waits for 250ms before rendering the code
    it is a good practive to prevent browser from crashing or slowing down
  */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html.replaceAll('{{ TEST_VARIABLE }}', testVariable)}</body>
          <style>${css.replaceAll('{{ TEST_VARIABLE }}', testVariable)}</style>
          <script>${js.replaceAll('{{ TEST_VARIABLE }}', testVariable)}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js, testVariable])


  const handleSave = () => {
    const files = {
      html: html,
      css: css,
      js: js
    }

    localStorage.setItem('kuikaTMP' + templateName, JSON.stringify(files))
    setSavedTemplates((prev) => {

      return [...prev,
      {
        files: files,
        name: templateName
      }]
    })
    setSaveModalisOpen(false)
    setTemplateName('')
  }

  useEffect(() => {
    const templateToLoad = JSON.parse(localStorage.getItem(selectedTemplate))
    if (templateToLoad) {
      setHtml(templateToLoad.html)
      setCss(templateToLoad.css)
      setJs(templateToLoad.js)
    }
  }, [selectedTemplate])

  useEffect(() => {
    const savedTemplates = []
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).includes('kuikaTMP')) {
        savedTemplates.push({
          files: JSON.parse(localStorage.getItem(localStorage.key(i))),
          name: localStorage.key(i).replace('kuikaTMP', '')
        })
      }
    }
    setSavedTemplates(savedTemplates)
  }, [])



  return (
    <div className='flex flex-col h-[100vh] overflow-hidden'>
      <div className="h-full flex ">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>

      <SaveModal
        isOpen={saveModalisOpen}
        setIsOpen={setSaveModalisOpen}
        onSave={handleSave}
        name={templateName}
        setName={setTemplateName}
      />


      <div className={minimize ? "h-[5vh]  flex flex-col  bg-gray-700 ease-out duration-500 transition-all translate-y-[2%]" : 'h-[50vh]  flex flex-col  bg-gray-700 ease-out duration-500 transition-all translate-y-0'} >
        <div className="flex justify-between  items-center w-full border-b-[1px] border-gray-500 px-2 py-1 ">
          <div className="flex space-x-2 items-center">
            <button
              className="bg-blue-600 text-white p-1 rounded-lg flex justify-between"
              onClick={() => setSaveModalisOpen(true)}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <label className="text-white ">Templates : </label>

            <select
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="bg-gray-700 text-white p-1 rounded-lg flex justify-between">
              <option value="default">Default</option>
              {savedTemplates.map((template, index) => {
                return <option key={index} value={template.name}

                >{template.name}</option>
              })
              }
            </select>

            <label className="text-white ">Test Variable : </label>
            <input
              type="text"
              value={testVariable}
              onChange={(e) => setTestVariable(e.target.value)}
              className="bg-gray-700 text-white p-1 rounded-lg flex justify-between"
            />


          </div>

          <button
            className="bg-blue-600 text-white p-1 rounded-lg flex justify-between"
            onClick={() => setMinimize(!minimize)}
          >
            <FontAwesomeIcon icon={minimize ? faPlus : faMinus} />
          </button>
        </div>
        <div className="flex">
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
          />
          <Editor
            language="javascript"
            displayName="JS"
            value={js}
            onChange={setJs}
          />
        </div>

      </div>

    </div>
  )
}

export default App;
