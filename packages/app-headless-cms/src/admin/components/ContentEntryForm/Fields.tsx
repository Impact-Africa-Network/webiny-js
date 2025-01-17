import React from "react";
import { Cell, Grid } from "@webiny/ui/Grid";
import { FieldElement } from "./FieldElement";
import {
    CmsEditorContentModel,
    CmsModelField,
    CmsEditorFieldsLayout,
    BindComponent
} from "~/types";

interface FieldsProps {
    Bind: BindComponent;
    contentModel: CmsEditorContentModel;
    fields: CmsModelField[];
    layout: CmsEditorFieldsLayout;
    gridClassName?: string;
}

const getFieldById = (fields: CmsModelField[], id: string): CmsModelField | null => {
    return fields.find(field => field.id === id) || null;
};

export const Fields = ({ Bind, fields, layout, contentModel, gridClassName }: FieldsProps) => {
    return (
        <Grid className={gridClassName}>
            {layout.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map(fieldId => {
                        const field = getFieldById(fields, fieldId) as CmsModelField;

                        return (
                            <Cell span={Math.floor(12 / row.length)} key={fieldId}>
                                <FieldElement
                                    field={field}
                                    Bind={Bind}
                                    contentModel={contentModel}
                                />
                            </Cell>
                        );
                    })}
                </React.Fragment>
            ))}
        </Grid>
    );
};
