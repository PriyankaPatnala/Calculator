			var i;
			var test = '';
			var test1='',flag=false,op=false,cp=false;
			function expression(val)
			{
				if(flag==true && val>='0' && val<='9')
				{
					test='';
				}
				test+=val;flag=false;
				document.getElementById("textId").value = test;
				test1=test;
				
			}
			
			window.onload = function () { 			
			test = document.getElementById("textId").value || '';
			}
			
			function evaluateFn()
			{
				
				var tokens=test.split("");
				var values=new Array();
				var ops=new Array();
				var sign='+',sflag=false;
				for(i=0;i<tokens.length;i++)
				{
					if(sflag==true)
					{
					
						sflag=false;
						continue;
					}
					if(tokens[i]==' ')
						continue;
				
					if(tokens[0]=='-' && tokens[1]>='0' && tokens[1]<='9' &&i==0)
					{
						
							var sbuf="-";i++;
							while(i<tokens.length && (tokens[i]>='0' && tokens[i]<='9')||tokens[i]=='.')
							{
								sbuf+=tokens[i];

								i++;
							}
						
							sign='+';
							values.push(Number(sbuf));
						
					}
					
					if(tokens[i]>='0' && tokens[i]<='9')
					{
						var sbuf="";
						while(i<tokens.length && (tokens[i]>='0' && tokens[i]<='9')||tokens[i]=='.')
						{
							sbuf+=tokens[i];
							
							i++;
						}
					
						sbuf=sign+sbuf;
						sign='+';
						values.push(Number(sbuf));
					}
					if (tokens[i] == '(')
					{
						op=true;
						ops.push(tokens[i]);
					}						
					else if(tokens[i]==')')
					{
						cp=true;
						if(op==false && cp==true)
							alert("missing (");
						
						while(ops[ops.length-1]!='(')
						{
							values.push(Number(compute(values.pop(),values.pop(),ops.pop())));
						}
							
						ops.pop();					
					}
				     else if(tokens[i]=='*' || tokens[i]=='/' || tokens[i]=='+' || tokens[i]=='-')
					 { 
						 if(tokens[i]=='*' || tokens[i]=='/' || tokens[i]=='+' || tokens[i]=='-')
						 {
							 
							 if((i+1)<tokens.length && (tokens[i+1]=='+' || tokens[i+1]=='-'))
							 {
								 sign=tokens[i+1];
								 sflag=true;
							 }
						 }
						
						 while(ops.length!=0 && hasPrecedence(tokens[i],ops[ops.length-1]))
						 {
							 values.push(Number(compute(values.pop(),values.pop(),ops.pop())));
						 }
						 ops.push(tokens[i]);
						
					 }
						 
				}
				while(ops.length!=0)
				{
					values.push(Number(compute(values.pop(),values.pop(),ops.pop())));
				}
				test=values.pop();
				document.getElementById("textId").value = test;
				flag=true;
							
			}
			
			function hasPrecedence(op1,op2)
			{
				if(op2=='(' || op2==')')
					return false;
				if((op1=='*' || op1=='/'|| op1=='%') && (op2=='+' || op2=='-'))
					return false;
				else 
					return true;
			
			}
			
			function compute(b,a,op)
			{
				switch(op)
				{
					case '+':
							return a+b;
					case '-':
							return a-b;
					case '*':
							return a*b;
					case '/':
						if(b==0)
							alert("cannot divide by zero");
						else
						{
							return a/b;
						}
					case '%':
						return a%b;
				}
				return 0;
			}
			
			function resetfn()
			{
				test="";
				document.getElementById("textId").value=test;
			}
				
			function backspace()
			{
				var length=test.length;
				
				if(typeof test=='number') //result
				{
					test=test1;
				}
				else
					test=test.substring(0,length-1);
				document.getElementById("textId").value=test;
			}
			