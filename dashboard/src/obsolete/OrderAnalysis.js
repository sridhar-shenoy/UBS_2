import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Typography from '@material-ui/core/Typography'
import LinearProgress from '@material-ui/core/LinearProgress'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
    root: {
        width: '90%',
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2,
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
});

function getSteps() {
    return ['Search for ID conflicts', 'Resolve ID conflicts', 'Create an ad'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'We\'re checking for any potential ID conflict.';
        case 1:
            return 'We\'ve found the following ID conflicts.';
        case 2:
            return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
        default:
            return 'Unknown step';
    }
}

class OrderAnalysis extends React.Component {
    constructor(props){
        super(props);
        this.state = { activeStep: 0 , viewState: 'collapsed', prevID: '', handling: -1}
    }

    handleStepOne = () => {
      // do something necessary to clarify the conflicted ID
      this.incrementState()
    };

    handleStepTwo = () => {
      this.state.handling = 0;
      setTimeout(this.incrementState, 2000)
    };

    // handleReset = () => {
    //     this.setState({
    //         activeStep: -1,
    //     })
    // }

    incrementState = () => {
      // console.log(this.state.activeStep + '     ' + getSteps().length)
      if (this.state.activeStep + 1 >= getSteps().length) {
        this.setState({activeStep: 0, viewState: 'collapsed', prevID: this.props.getSearchID(), handling: -1})
      } else {
        this.setState({activeStep: this.state.activeStep + 1, viewState: 'visible'})
      }
    };

    activatePrompt = () => {
      setTimeout(() => {this.setState({handling: 1})}, 100)
      // setTimeout(() => {this.setState({handling: this.state.handling + 1})}, 2000)
    };

    skipStepOne = () => {
      this.setState({activeStep: 2})
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;

        // console.log('handling:' + this.state.handling )
        if(this.props.getSearchID() === '' || (this.state.viewState === 'collapsed' && this.props.getSearchID() === this.state.prevID)){
          return (null)
        } else {
          if (this.state.handling === -1) {
            this.setState({handling: 0})
            // this.handleStepOne()
          } else if (this.state.handling === 0) {
            // console.log('called')
            this.activatePrompt();
            setTimeout(this.incrementState, 2000)
          } else if (this.state.activeStep === 2 && this.state.handling === 1) {
            this.handleStepTwo()
          } else if (this.state.activeStep === 1 && this.props.collide_type.length === 0) {
            this.skipStepOne()
          }
          return (
              <div className={classes.root}>
                  <Typography variant="h6" id="tableTitle" align='center'>
                      Order Analysis
                  </Typography>
                  <LinearProgress />
                  <Stepper activeStep={activeStep} orientation="vertical">
                      {
                        steps.map((label, index) => {
                          return (
                            <Step key={label}>
                              <StepLabel>{label}</StepLabel>
                              <StepContent>
                              {
                                index === 1 ? (
                                  <div className={classes.actionsContainer}>
                                  {
                                    this.props.collide_type.length === 2 ? (<Typography variant='subtitle2'>We have found the same ID
                                      in {this.props.collide_type[0]} and {this.props.collide_type[1]}</Typography>) :
                                      (<Typography variant='subtitle2'>We have found the same ID
                                      in {this.props.collide_type[0]}, {this.props.collide_type[1]} and {this.props.collide_type[2]}</Typography>)
                                  }
                                  <Typography variant='subtitle2'>Which one are you referring to?</Typography>
                                  <List component='nav'>
                                    {
                                      this.props.collide_type.map((item, i) => (
                                        <ListItem
                                          button={true}
                                          title={item}
                                          onClick={this.handleStepOne.bind(this)}
                                        >
                                          <ListItemText primary={this.props.collide_type[i]}/>
                                        </ListItem>
                                      ))
                                    }
                                  </List>
                                  </div>
                                ) : (<Typography variant='subtitle2'>{getStepContent(index)}</Typography>)
                              }
                              </StepContent>
                            </Step>
                          )
                        })
                      }
                  </Stepper>
                  {/*activeStep === steps.length && (
                      <Paper square elevation={0} className={classes.resetContainer}>
                          <Typography>All steps completed - you&quot;re finished</Typography>
                          <Button onClick={this.handleReset} className={classes.button}>
                              Reset
                          </Button>
                      </Paper>
                  )*/}
              </div>
          );
        }
    }
}

OrderAnalysis.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(OrderAnalysis)
