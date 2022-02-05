import React, { useContext, useState } from 'react';

const ReferenceImageContext = React.createContext()
const ReferenceImageUpdateContext = React.createContext()

export function useReferenceImage() {
    return useContext(ReferenceImageContext)
}

export function useReferenceImageUpdate() {
    return useContext(ReferenceImageUpdateContext)
}

export function ImageProvider({ children }) {
    // const [referenceImage, setReferenceImage] = useState(true);
    const [searchImage, setSearchImage] = useState(true);

    return (
        <ReferenceImageContext.Provider value={searchImage} >
            <ReferenceImageUpdateContext.Provider value={setSearchImage} >
                {children}
            </ReferenceImageUpdateContext.Provider>
        </ReferenceImageContext.Provider>
    )
}