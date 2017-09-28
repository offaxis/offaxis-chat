import React, { Component } from 'react';
import { connect } from 'react-redux';


export function AuthenticatedRoute(Component) {
    class AuthenticatedComponent extends Component {

        static contextTypes = {
            router: React.PropTypes.object
        }

        componentWillMount() {
            if(!this.props.user) {
                this.context.router.push('/login');
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.user) {
                this.context.router.push('/login');
            }
        }

        isAuthenticated() {
            return this.props.user;
        }

        render() {
            // return <ComposedComponent {...this.props} />
            return (
                <div>
                    {this.isAuthenticated === true
                        ? <Component
                            {...this.props}
                        />
                        : null
                    }
                </div>
            )
        }
    }

    function mapStateToProps(state) {
        return { user: state.users.user };
    }

    return connect(mapStateToProps)(AuthenticatedRoute);
}
