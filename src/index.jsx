import React from 'react';
import ReactDOM from 'react-dom/client';
import {IntlProvider} from "react-intl";
import { PopupProvider } from './contexts/PopupContext.jsx';
import './index.scss'

import {en} from "./lang/en.js";
import {fr} from "./lang/fr.js";
import App from './pages/App.jsx';

const messages = {
  'en': en,
  'fr': fr,
};

const language = navigator.language.split(/[-_]/)[0];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PopupProvider>
            <IntlProvider onError={()=>{}} locale={navigator.language} messages={messages[language]}>
                <App/>
            </IntlProvider>
        </PopupProvider>
    </React.StrictMode>
)

//                 _
//             ,.-" "-.,
//            /   ===   \
//           /  =======  \
//        __|  (o)   (0)  |__      
//       / _|    .---.    |_ \         
//      | /.----/ O O \----.\ |       
//       \/     |     |     \/        
//       |                   |            
//       |                   |           
//       |                   |          
//       _\   -.,_____,.-   /_         
//   ,.-"  "-.,_________,.-"  "-.,
//  /          |       |          \  
// |           l.     .l           | 
// |            |     |            |
// l.           |     |           .l             
//  |           l.   .l           | \,     
//  l.           |   |           .l   \,    
//   |           |   |           |      \,  
//   l.          |   |          .l        |
//    |          |   |          |         |
//    |          |---|          |         |
//    |          |   |          |         |
//    /"-.,__,.-"\   /"-.,__,.-"\"-.,_,.-"\
//   |            \ /            |         |
//   |             |             |         |
//    \__|__|__|__/ \__|__|__|__/ \_|__|__/
//