import { createContext, ReactNode, useState } from "react";

interface CreateFormData {
    task: string;
    minutesAmount: number;
}

interface Cycle {

    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextData {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinish: () => void;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateFormData) => void;
    interromperCycle: () => void;

}

export const CyclesContext = createContext({} as CyclesContextData);

interface CyclesContextProviderProps {
    children: ReactNode;
}

export function CyclesContextProvider({
    children,
}: CyclesContextProviderProps) {
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinish() {

        setCycles((state) =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return { ...cycle, finishedDate: new Date() }
                } else {
                    return cycle;
                }
            }),
        );
    }

    function createNewCycle(data: CreateFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        setCycles((state) => [...cycles, newCycle]);
        setActiveCycleId(id);
        setAmountSecondsPassed(0);
        //reset();

    }

    function interromperCycle() {
        setCycles(state =>
            state.map((cycle) => {
                if (cycle.id === activeCycleId) {
                    return {
                        ...cycle,
                        interruptedDate: new Date(),
                    }
                } else {

                    return cycle;
                }
            })
        );

        setActiveCycleId(null);
    }

    return (
        <CyclesContext.Provider
            value={{
                activeCycle,
                activeCycleId,
                amountSecondsPassed,
                markCurrentCycleAsFinish,
                setSecondsPassed,
                createNewCycle,
                interromperCycle

            }}>

            {children}

        </CyclesContext.Provider>
    )

}