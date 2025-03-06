import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useState } from "react";

export function Home() {
    const [task, setTask] = useState('');
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>

                    <label htmlFor="task">Vou trabalhar em </label>
                    <TaskInput
                        id="task"
                        list="tasks-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        onChange={(e) => setTask(e.target.value)}
                        value={task}
                    />
                    <datalist id="tasks-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />

                    </datalist>

                    <label htmlFor="minutesAmount">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                    />

                    <span>minutos</span>

                </FormContainer>

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={!task} type="submit">
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}