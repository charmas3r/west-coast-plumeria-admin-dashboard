import { TextField, Typography } from "@material-ui/core";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import Form from "@saleor/components/Form";
import { SubmitPromise } from "@saleor/hooks/useForm";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import TranslationFieldsSave from "./TranslationFieldsSave";

interface TranslationFieldsShortProps {
  disabled: boolean;
  edit: boolean;
  initial: string;
  saveButtonState: ConfirmButtonTransitionState;
  onDiscard: () => void;
  onSubmit: (data: string) => SubmitPromise<any[]>;
}

const TranslationFieldsShort: React.FC<TranslationFieldsShortProps> = ({
  disabled,
  edit,
  initial,
  saveButtonState,
  onDiscard,
  onSubmit
}) => {
  const intl = useIntl();

  return edit ? (
    <Form
      confirmLeave
      initial={{ translation: initial }}
      onSubmit={data => onSubmit(data.translation)}
    >
      {({ change, data, submit }) => (
        <div>
          <TextField
            disabled={disabled}
            fullWidth
            label={intl.formatMessage({
              defaultMessage: "Translation"
            })}
            name="translation"
            data-test-id="translation"
            value={data.translation || ""}
            onChange={change}
          />
          <TranslationFieldsSave
            saveButtonState={saveButtonState}
            onDiscard={onDiscard}
            onSave={submit}
          />
        </div>
      )}
    </Form>
  ) : initial === null ? (
    <Typography color="textSecondary">
      <FormattedMessage defaultMessage="No translation yet" />
    </Typography>
  ) : (
    <Typography>{initial}</Typography>
  );
};
TranslationFieldsShort.displayName = "TranslationFieldsShort";
export default TranslationFieldsShort;
