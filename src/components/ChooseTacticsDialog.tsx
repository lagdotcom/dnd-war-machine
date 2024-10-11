import { useCallback, useState } from "react";
import {
  Button,
  Dialog,
  Heading,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Modal,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";

import { useAppDispatch, useAppSelector } from "../state/hooks";
import { selectGameState } from "../state/selectors";
import { combat } from "../state/thunks";
import { ChooseTacticsGameState, setGameState } from "../state/ui";
import { selectUnitById } from "../state/units";
import { Tactics } from "../tactics";

const TacticsValues: Record<Key, Tactics> = {
  Overrun: Tactics.Overrun,
  Attack: Tactics.Attack,
  Envelop: Tactics.Envelop,
  Trap: Tactics.Trap,
  Hold: Tactics.Hold,
  Withdraw: Tactics.Withdraw,
};

const tacticsPopover = (
  <Popover>
    <ListBox>
      <ListBoxItem id="Overrun">Overrun</ListBoxItem>
      <ListBoxItem id="Attack">Attack</ListBoxItem>
      <ListBoxItem id="Envelop">Envelop</ListBoxItem>
      <ListBoxItem id="Trap">Trap</ListBoxItem>
      <ListBoxItem id="Hold">Hold</ListBoxItem>
      <ListBoxItem id="Withdraw">Withdraw</ListBoxItem>
    </ListBox>
  </Popover>
);

function ChooseTacticsDialog_inner({
  attacker,
  defender,
  previous,
}: ChooseTacticsGameState) {
  const attackerUnit = useAppSelector((state) =>
    selectUnitById(state, attacker),
  );
  const defenderUnit = useAppSelector((state) =>
    selectUnitById(state, defender),
  );

  const [attackerTactics, setAttackerTactics] = useState<Key>("");
  const [defenderTactics, setDefenderTactics] = useState<Key>("");

  const dispatch = useAppDispatch();
  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) dispatch(setGameState(previous));
    },
    [dispatch, previous],
  );

  const startFight = useCallback(() => {
    if (attackerTactics && defenderTactics)
      dispatch(
        combat(
          attacker,
          TacticsValues[attackerTactics],
          defender,
          TacticsValues[defenderTactics],
        ),
      );
  }, [attacker, attackerTactics, defender, defenderTactics, dispatch]);

  const isDisabled = attackerTactics === "" || defenderTactics === "";

  return (
    <Modal isDismissable isOpen onOpenChange={onOpenChange}>
      <Dialog>
        <Heading slot="title">Choose Tactics</Heading>

        <div>
          <Select
            selectedKey={attackerTactics}
            onSelectionChange={setAttackerTactics}
          >
            <Label>{attackerUnit.force.name}</Label>
            <Button>
              <SelectValue />
              <span aria-hidden="true">▼</span>
            </Button>
            {tacticsPopover}
          </Select>
          <Select
            selectedKey={defenderTactics}
            onSelectionChange={setDefenderTactics}
          >
            <Label>{defenderUnit.force.name}</Label>
            <Button>
              <SelectValue />
              <span aria-hidden="true">▼</span>
            </Button>
            {tacticsPopover}
          </Select>
        </div>

        <Button isDisabled={isDisabled} onPress={startFight}>
          Fight!
        </Button>
      </Dialog>
    </Modal>
  );
}

export default function ChooseTacticsDialog() {
  const game = useAppSelector(selectGameState);

  if (game.type !== "tactics") return;
  return <ChooseTacticsDialog_inner {...game} />;
}
