import classes from './IntroductionPage.module.css';

function IntroductionPage() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <h1>Start planning</h1>
            </div>
            <div className={classes.imageContainer}>
                <img className={classes.image} src="https://images.pexels.com/photos/7368311/pexels-photo-7368311.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt=""></img>
            </div>
            <div className={classes.content}>

            </div>
        </div>
    )
}

export default IntroductionPage;