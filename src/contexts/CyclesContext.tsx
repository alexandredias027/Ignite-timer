import { createContext, ReactNode, useReducer, useState } from "react";
import { cyclesReducer } from "../cycles/reducer";
import { Cycle } from "../interfaces/CyclesInterface";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../cycles/actions";

interface CreateFormData {
    task: string;
    minutesAmount: number;
}
interface CyclesContextData {
    cycles: Cycle[];
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
    const [cyclesState, dispatch] = useReducer(cyclesReducer, {
        cycles: [],
        activeCycleId: null,
        amountSecondsPassed: 0,
    }
    )

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinish() {
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function createNewCycle(data: CreateFormData) {
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }
        dispatch(
            addNewCycleAction(newCycle)
        );

        setAmountSecondsPassed(0);
    }

    function interromperCycle() {
        dispatch(interruptCurrentCycleAction());
    }

    return (
        <CyclesContext.Provider
            value={{
                cycles,
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