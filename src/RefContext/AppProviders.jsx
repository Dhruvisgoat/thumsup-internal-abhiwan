import { CollectiblesProvider } from "./CollectiblesContext";
import { DirProvider } from "./dirContext";
import { DirectionProvider } from "./DirectionContext";
import { ViewProvider } from "./ViewContext";
import { MyProvider } from "./Context";
import { CapRemoveIdProvider } from "./CapRemoveId";
import { PauseProvider } from "./PauseContext";

const AppProviders = ({ children }) => {
    return (
        <CapRemoveIdProvider >
            <DirectionProvider>
                <CollectiblesProvider>
                    <DirProvider>
                        <ViewProvider>
                            <MyProvider>
                                <PauseProvider>
                                    {children}
                                </PauseProvider>
                            </MyProvider>
                        </ViewProvider>
                    </DirProvider>
                </CollectiblesProvider>
            </DirectionProvider>
        </CapRemoveIdProvider>

    );
};

export default AppProviders;