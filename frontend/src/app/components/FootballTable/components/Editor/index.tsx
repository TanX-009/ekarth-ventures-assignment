import Input from "@/components/Input";
import { TGame } from "@/types/game";
import { Row } from "@tanstack/react-table";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./styles.module.css";
import Message, { TMessage } from "@/components/Message";
import GameService from "@/services/game";
import handleResponse from "@/systems/handleResponse";
import { TUser } from "@/types/user";

interface TProps {
  row: Row<TGame>;
  accessorKey: keyof TGame;
  updateTick: Dispatch<SetStateAction<boolean>>;
  login: TUser | null;
}

export default function Editor({
  row,
  accessorKey,
  updateTick,
  login,
}: TProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState<TMessage>({
    value: "",
    status: "neutral",
  });
  const inputRef = useRef<HTMLInputElement>(null);

  const onEdit = () => {
    if (login?.username && row.original.status === "Match Finished")
      setIsEditing(true);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage({ value: "", status: "error" });

    const value = event.currentTarget.value.value;

    if (Number(value) === row.original[accessorKey]) {
      setMessage({ value: "No changes detected!", status: "error" });
    }
    if (Number(value) < 0) {
      setMessage({ value: "Score can't be negative!", status: "error" });
    }

    const response = await GameService.updateScore({
      fixture_id: row.original.fixture_id,
      [accessorKey]: Number(value),
    });

    handleResponse(response, "Updated!", setMessage, () => {
      updateTick((val) => !val);
    });
  };

  const onBlur = () => {
    setIsEditing(false);
    inputRef.current = null;
    setMessage({ value: "", status: "neutral" });
  };

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  if (isEditing) {
    return (
      <>
        <form className={styles.form} onSubmit={onSubmit}>
          <Input
            type="number"
            name="value"
            defaultValue={row.original.home_score}
            className={styles.input}
            ref={inputRef}
            onBlur={onBlur}
          />
          <Message status={message.status}>{message.value}</Message>
        </form>
      </>
    );
  }
  return <div onClick={onEdit}>{row.original[accessorKey] || "-"}</div>;
}
