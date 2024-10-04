import { useCallback, useMemo } from "react";
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
import {
  ChooseTactics,
  setChoosingTactics,
  updateChoosingTactics,
} from "../state/ui";
import { selectUnitById } from "../state/units";
import { Tactics, TacticsNames } from "../tactics";
import isDefined from "../tools/isDefined";

export default function ChooseTacticsDialog({
  choose,
}: {
  choose: ChooseTactics;
}) {
  const attacker = useAppSelector((state) =>
    selectUnitById(state, choose.attacker),
  );
  const defender = useAppSelector((state) =>
    selectUnitById(state, choose.defender),
  );

  const dispatch = useAppDispatch();
  const onOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpen) dispatch(setChoosingTactics(undefined));
    },
    [dispatch],
  );

  const tacticsPopover = useMemo(
    () => (
      <Popover>
        <ListBox>
          {TacticsNames.map((name) => (
            <ListBoxItem key={name}>{name}</ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    ),
    [],
  );

  const changeAttacker = useCallback(
    (value: Key) => {
      dispatch(updateChoosingTactics({ attackerTactics: value as Tactics }));
    },
    [dispatch],
  );
  const changeDefender = useCallback(
    (value: Key) => {
      dispatch(updateChoosingTactics({ defenderTactics: value as Tactics }));
    },
    [dispatch],
  );

  const isDisabled =
    !isDefined(choose.attackerTactics) || !isDefined(choose.defenderTactics);

  return (
    <Modal isDismissable isOpen onOpenChange={onOpenChange}>
      <Dialog>
        <Heading slot="title">Choose Tactics</Heading>

        <div>
          <Select
            selectedKey={choose.attackerTactics}
            onSelectionChange={changeAttacker}
          >
            <Label>{attacker.force.name}</Label>
            <Button>
              <SelectValue />
              <span aria-hidden="true">▼</span>
            </Button>
            {tacticsPopover}
          </Select>
          <Select
            selectedKey={choose.defenderTactics}
            onSelectionChange={changeDefender}
          >
            <Label>{defender.force.name}</Label>
            <Button>
              <SelectValue />
              <span aria-hidden="true">▼</span>
            </Button>
            {tacticsPopover}
          </Select>
        </div>

        <Button isDisabled={isDisabled}>Fight!</Button>
      </Dialog>
    </Modal>
  );
}
