import React from 'react'
import UML from './components/UML';
import './static/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import './static/css/app.css';

function App() {
    function Name () {
        let _uml = UML();
        let functions = _uml.getFunctions();
        return (
            <div className="card border border-danger">
                <div className="card-header position-relative">
                    <div className='position-absolute' style={{
                        left: '-12px',
                        top: '-12px'
                    }}>
                        <span className="badge text-bg-red-500"><i className="bi bi-folder-symlink-fill bi-start"></i>{_uml.namespace}</span>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center'>
                        <span>
                            <span className=''><i className='bi bi-lightning-charge-fill bi-start text-danger'></i></span>
                            {_uml.name}
                        </span>
                        <div>
                            <i className='bi bi-chevron-down'></i>
                        </div>
                    </div>
                </div>
                <div className="card-body fs-5">
                    <div className="functions">
                        {functions && functions.map((func, func_index) => {
                           return (
                                <div className="function-item" key={func_index}>
                                    <span className="extend-function"></span>
                                    <span className="">
                                        <i className="bi bi-plug-fill bi-start"></i>
                                    </span>
                                    <span>function </span>
                                    <span className="text-primary">{func.name}</span>
                                    <span>(<span className="text-secondary">$name</span>)</span>
                                </div>
                           )
                        })}
                    </div>
                    <div className="functions extend-functions">
                        {functions && functions.map((func, func_index) => {
                           return (
                                <div className="function-item" key={func_index}>
                                    <span className="extend-function"></span>
                                    <span className="">
                                        <i className="bi bi-plugin bi-start"></i>
                                    </span>
                                    <span>function </span>
                                    <span className="text-primary">{func.name}</span>
                                    <span>(<span className="text-secondary">$name</span>)</span>
                                </div>
                           )
                        })}
                    </div>
                    <div className="functions interface-functions">
                        {functions && functions.map((func, func_index) => {
                           return (
                                <div className="function-item" key={func_index}>
                                    <span className="extend-function"></span>
                                    <span className="">
                                        <i className="bi bi-record-circle bi-start"></i>
                                    </span>
                                    <span>function </span>
                                    <span className="text-primary">{func.name}</span>
                                    <span>(<span className="text-secondary">$name</span>)</span>
                                </div>
                           )
                        })}
                    </div>
                    <div className="mt-2">
                        <button type='button' className='btn btn-outline-danger btn-sm d-block fs-5 w-100'>添加方法</button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <Name />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;