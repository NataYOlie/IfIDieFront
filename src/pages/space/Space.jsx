import React, {useEffect} from 'react';
import './space.css'
import {Link} from "react-router-dom";

const Space = (props) => {

    useEffect(() => {
        if (props.stepTasks[0].default_task == null){
            window.location.reload()
        }

    }, [])

    function percentageDone() {
        const steptasks = props.stepTasks;
        console.log("percentage done" + props.stepTasks.length);
        if (props.stepTasks.length > 0){
            let count = 0;
            steptasks.forEach(task => {
                if (task.validationDate && task.validationDate != null) {
                    count += 1;
                }
            });
            console.log("count " + count);
            let percentage = (count * 100) /props.stepTasks.length ;
            return Math.floor(percentage);

        }else {
            return 0;
        }
    }


  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          {/*<img src={profile_banner} alt="banner" />*/}
        </div>
        <div className="profile-pic">
            {/*<img src={profile_pic} alt="profile" />*/}
            <h3>{props.user.surname} {props.user.lastname}</h3>
        </div>
          {props.user.role === "ROLE_ADMIN" && (
              <h3>- ADMIN -</h3>
          )}
      </div>


        <div className="space-content">
            <div className="space-info">
                <h1>Vos Infos</h1>
                <div>
                    <h2>Nom : </h2>
                    <p>{props.user.lastname}</p>
                    <h2>Prénom : </h2>
                    <p>{props.user.surname}</p>
                    <h2>Email : </h2>
                    <p>{props.user.email}</p>
                    {/*<h2>Adresse : </h2>*/}
                    {/*<p>non renseignée</p>*/}
                </div>
            </div>
            <div className="space-info">
                <h1>Vos éléments : </h1>
                {props.user.role === "ROLE_USER" && (
                    <div>
                        <h2>Mettre en ordre : </h2>
                        {
                            props.stepTasks[0].validationDate && (
                                <p>{percentageDone()} % de tâches validées ! </p>
                            )
                        }

                        <Link to ="/mettre_en_ordre">Voir ma liste</Link>
                    </div>
                )}
                {props.user.role === "ROLE_ADMIN" && (
                    <div>
                        <h2>Administration </h2>
                        <Link to ="/adminboard">Tableau de board</Link>
                    </div>
                )}

            </div>
        </div>

    </div>
  );
};

export default Space;
