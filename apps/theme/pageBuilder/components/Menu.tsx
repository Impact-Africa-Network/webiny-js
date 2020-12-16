import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { get } from "lodash";
import invariant from "invariant";

declare global {
    // eslint-disable-next-line
    namespace JSX {
        interface IntrinsicElements {
            "ssr-cache": {
                class?: string;
                id?: string;
            };
        }
    }
}

export const GET_PUBLIC_MENU = gql`
    query GetPublicMenu($slug: String!) {
        pageBuilder {
            getPublicMenu(slug: $slug) {
                data {
                    slug
                    title
                    items
                }
                error {
                    code
                }
            }
        }
    }
`;

const Menu = ({ slug, component: Component }) => {
    invariant(Component, `You must provide a valid Menu component name (via "component" prop).`);

    return (
        <Query query={GET_PUBLIC_MENU} variables={{ slug }}>
            {props => {
                const data = get(props, "data.pageBuilder.getPublicMenu.data", {
                    items: [],
                    title: null,
                    slug: null
                });

                return (
                    <>
                        <ssr-cache data-class="pb-menu" data-id={slug} />
                        <Component {...props} data={data} />
                    </>
                );
            }}
        </Query>
    );
};

export default Menu;